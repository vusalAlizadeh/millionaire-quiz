import { useRef } from "react";
const Start = ({ setUser }) => {
  const userName = useRef();
  const handleClick = () => {
    userName.current.value && setUser(userName.current.value);
  };
  return (
    
    
     <div className="start">
       <input
       type="text"
        ref={userName}
        className="startInput"
        placeholder="Enter your name"
       />
       <button className="startButton" onClick={handleClick}>
        Start
      </button>
     </div>
  );
};

export default Start;
