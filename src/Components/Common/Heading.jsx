function Heading({ title, className = '', children }) {
  return (
    <h3 className={`font-poppins ${className}`}>
      {title && title}
      {children && children}
    </h3>
  );
}

export default Heading;
