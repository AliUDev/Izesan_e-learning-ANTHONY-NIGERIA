import { useEffect } from 'react';

const ViewSlots = ({ showSlots, timeSlots }) => {
  timeSlots.map((data, index) => {
    console.log(data);
  });
  const addClass = () => {
    if (showSlots) {
      document.body.classList.add('remove-h');
    } else {
      document.body.classList.remove('remove-h');
    }
  };
  useEffect(() => {
    addClass();
  }, [showSlots]);
  function getConvertTime(dataTime) {
    //console.log('datetime' + dataTime);
    let utcTime1 = dataTime.split(',')[1].split('|')[0].split('-')[0];
    let utcTime2 = dataTime.split(',')[1].split('|')[0].split('-')[1];
    var totalLen = dataTime.split(',').length;
    // console.log('IMMM' + dataTime.split(',')[totalLen - 1].split('|')[1]);
    // console.log('abc' + dataTime.split(',').length);
    //let utcDt = dataTime.split(',')[1].split('|')[1];
    let utcDt = dataTime.split(',')[totalLen - 1].split('|')[1];
    // 02:00 pm-03:00 pm|2021-09-29
    function convertUtcToLocalTime(time, dait) {
      let dat1e = new Date(`${dait} ${time} UTC`);
      return dat1e.toLocaleString();
    }
    // console.log(utcTime1);
    // console.log(utcDt);
    // console.log(convertUtcToLocalTime(utcTime1, utcDt));
    let c_t_1 = convertUtcToLocalTime(utcTime1, utcDt).split(',')[1];
    let c_t_2 = convertUtcToLocalTime(utcTime2, utcDt).split(',')[1];
    // console.log(c_t_1);
    let [n, t, s] = c_t_1.split(':');
    let [n1, t1, s1] = c_t_2.split(':');
    function convertToSmall(modifier) {
      let t;
      if (modifier == 'AM') {
        t = 'am';
      } else if (modifier == 'PM') {
        t = 'pm';
      }
      return t;
    }
    let f_t_1 = `${
      n < 10 ? '0' + n.replace(/\s/g, '') : n.replace(/\s/g, '')
    }:${t} ${convertToSmall(s.split(' ')[1])}`;
    let f_t_2 = `${
      n1 < 10 ? '0' + n1.replace(/\s/g, '') : n1.replace(/\s/g, '')
    }:${t1} ${convertToSmall(s1.split(' ')[1])}`;
    let total_final_time = `${f_t_1}-${f_t_2}`;
    return total_final_time;
  }
  return (
    <div>
      <div className="container">
        <div className="row ">
          <div className="col-md-12">
            <div
              className={
                showSlots ? 'modal-popup booking-calander show' : 'modal-popup booking-calander'
              }>
              <div className={showSlots ? 'show' : ''}>
                <div className="modal-header-custom d-flex justify-content-between">
                  <h6>Date</h6>
                </div>
                <div className="text-danger">
                  {timeSlots.length == 1 ? timeSlots[0].date : null}
                </div>
                <hr />
                <div className="modal-body-custom">
                  {timeSlots.length == 1 ? (
                    <div className="main-slotsContainer">
                      <div className="content d-flex">
                        {timeSlots.map((data) => {
                          // let time = data.time.split(',')[0]
                          return (
                            <div className="text" key={data.ts_id}>
                              {getConvertTime(data.time)}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                  {timeSlots.length > 1 ? (
                    <div className="main-slotsContainer">
                      <div className="double-slots">
                        {timeSlots.map((data, index) => {
                          // let time = data.time.split(',')[0]
                          return (
                            <div key={index}>
                              <h3 className="text-center pb-2">{data.date}</h3>
                              <div className="content d-flex">
                                <div className="text" key={data.ts_id}>
                                  {getConvertTime(data.time)}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSlots;
