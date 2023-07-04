import './alert.css';

const QuizResponsePopup = ({
  quizResponse,
  setquizResponse,
  allDetails,
  setQuiz,
  question,
  type
}) => {
  function againQuizHandler(e) {
    e.preventDefault();
    setquizResponse(false);
    setQuiz(false);
    question();
  }
  function getText() {
    let t = {};
    if (localStorage.getItem('lang') == 'Esan') {
      t = {
        title1:
          'Amọnghọn! Congratulations! In light of your hard work, the Ediọnwele (elders) have decided to award you the title of :',
        title2: 'Keep up the good work! Obọ ẹ dale!'
      };
    } else if (localStorage.getItem('lang') == 'Yoruba') {
      t = {
        title1:
          'Ẹkú àṣeyọrí! Congratulations! In light of your hard work, the Àwọn Alàgbà (elders) have decided to award you the title of :',
        title2: 'Keep up the good work! Obọ ẹ dale!'
      };
    } else if (localStorage.getItem('lang') == 'Igbo') {
      t = {
        title1:
          'Jisie ike! Congratulations! In light of your hard work, the Ndị okenye (elders) have decided to award you the title of :',
        title2: 'Keep up the good work! mere nke ọma!'
      };
    } else if (localStorage.getItem('lang') == 'Hausa') {
      t = {
        title1:
          'San barka! Congratulations! In light of your hard work, the Dattawa (elders) have decided to award you the title of :',
        title2: 'Keep up the good work! Aiki ya yi kyau!'
      };
    } else if (localStorage.getItem('lang') == 'Zulu') {
      t = {
        title1:
          'Halala! Congratulations! In light of your hard work, the Abadala (elders) have decided to award you the title of :',
        title2: 'Keep up the good work! Usebenzile!'
      };
    } else if (localStorage.getItem('lang') == 'SeTswana') {
      t = {
        title1:
          'Thoholetsa! Congratulations! In light of your hard work, the Ba golo (elders) have decided to award you the title of :',
        title2: 'Keep up the good work! Mosebetsi o motle!'
      };
    } else if (localStorage.getItem('lang') == 'Twi') {
      t = {
        title1:
          'Wo titiri nkwa! Congratulations! In light of your hard work, the Mpanimfoɔ (elders) have decided to award you the title of :',
        title2: 'Keep up the good work! Adwuma pa!'
      };
    } else if (localStorage.getItem('lang') == 'Swahili') {
      t = {
        title1:
          'Hongera! Congratulations! In light of your hard work, the Wazee (elders) have decided to award you the title of :',
        title2: 'Keep up the good work! Kazi njema!'
      };
    } else if (localStorage.getItem('lang') == 'IsiXhosa') {
      t = {
        title1:
          'Sivuyisana nawe! Congratulations! In light of your hard work, the Abadala (elders) have decided to award you the title of :',
        title2: 'Keep up the good work!  Wenze kakuhle!'
      };
    }
    return t;
  }
  return (
    <>
      <div className={quizResponse ? 'bg-blur' : ''}></div>
      <div
        className={quizResponse ? 'popup center quizResponse active' : 'popup center quizResponse'}>
        {type == 'fail' ? (
          <div className="px-5">
            <div className="title">Quiz Result</div>
            <div className="text-danger">Not Pass Quiz</div>
            <div>Total Question: {allDetails.quizData ? allDetails.quizData.length : 'null'}</div>
            <div>Correct Answer: {allDetails.quizTrueAns}</div>
            <div>
              Wrong Answer:{' '}
              {(allDetails.quizData ? allDetails.quizData.length : 0) - allDetails.quizTrueAns}
            </div>
            <div className="fail_btns d-flex align-items-center justify-content-between">
              <div
                className="text-danger mr-5"
                onClick={() => {
                  setquizResponse(false);
                  setQuiz(false);
                }}>
                Not Now
              </div>
              <div className="text-primary" onClick={(e) => againQuizHandler(e)}>
                Again Quiz
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="title">{getText().title1}</div>
            <div className="badge_img mb-3">
              <img
                width="70"
                src="assets/leaderboard_img/farmer_male_dropdoown.png"
                alt="badge_image"
              />
              <span>Farmer</span>
            </div>
            <div className="title mb-3">{getText().title2}</div>
            <div className="quiz_back_btn">
              <button className="btn btn-danger" onClick={(e) => againQuizHandler(e)}>
                Back to New Chapter
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default QuizResponsePopup;
