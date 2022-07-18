import "./App.css";
import React, { useEffect, useState } from "react";

const Spoiler = ({ header, open = false, children }) => {
  const [visibility, setVisibility] = useState(open);
  const onToggle = () => {
    setVisibility(visibility ? false : true);
  };

  return (
    <div className="Spoiler" onClick={onToggle}>
      {header} <br />
      {visibility ? children : ""}
    </div>
  );
};

class CRangeInput extends React.Component {
  state = {
    text: "",
  };
  render() {
    return (
      <>
        <p>
          Text should be longer than {this.props.min} and shorter than {this.props.max}
        </p>
        <p>
          Your's text legth is {this.state.text.length}
        </p>
        <strong>TextValidation</strong>
        <br />
        <input
          type="text"
          onChange={(e) => {
            this.setState({ text: e.target.value });
          }}
          style={
            this.state.text.length > this.props.min &&
            this.state.text.length < this.props.max
              ? { background: "greenyellow" }
              : { background: "tomato" }
          }
        />
        <br />
      </>
    );
  }
}

const FRangeInput = ({ min, max }) => {
  const [text, SetText] = useState("");

  return (
    <>
      <strong>TextValidation</strong>
      <br />
      <input
        type="text"
        onChange={(e) => SetText((text) => (text = e.target.value))}
        value={text}
        style={
          text.length > min && text.length < max
            ? { background: "greenyellow" }
            : { background: "tomato" }
        }
      />
    </>
  );
};

class CPasswordInput extends React.Component {
  state = {
    firstPass: "",
    secondPass: " ",
  };
  render() {
    return (
      <>
        <strong>Pass</strong>
        <br />
        <input
          type="text"
          onChange={(e) => {
            this.setState({ firstPass: e.target.value });
          }}
          style={
            /.*([a-z]+[A-Z]+[0-9]+|[a-z]+[0-9]+[A-Z]+|[A-Z]+[a-z]+[0-9]+|[A-Z]+[0-9]+[a-z]+|[0-9]+[a-z]+[A-Z]+|[0-9]+[A-Z]+[a-z]+).*/.test(
              this.state.firstPass
            ) && this.state.firstPass.length > this.props.min
              ? { background: "gold" }
              : { background: "tomato" }
          }
        />
        <br />
        <strong>Repeat pass</strong>
        <br />
        <input
          type="text"
          onChange={(e) => {
            this.setState({ secondPass: e.target.value });
          }}
          style={
            this.state.firstPass === this.state.secondPass
              ? { background: "greenyellowyellow" }
              : { background: "tomato" }
          }
        />
      </>
    );
  }
}

const FPassword = ({ min }) => {
  const [firstPass, SetFirstPass] = useState("");
  const [secondPass, SetSecondPass] = useState("");

  return (
    <>
      <br />
      <strong>Pass</strong>
      <br />
      <input
        type="text"
        onChange={(e) =>
          SetFirstPass((firstPass) => (firstPass = e.target.value))
        }
        value={firstPass}
        style={
          /.*([a-z]+[A-Z]+[0-9]+|[a-z]+[0-9]+[A-Z]+|[A-Z]+[a-z]+[0-9]+|[A-Z]+[0-9]+[a-z]+|[0-9]+[a-z]+[A-Z]+|[0-9]+[A-Z]+[a-z]+).*/.test(
            firstPass
          ) && firstPass.length > min
            ? { background: "gold" }
            : { background: "tomato" }
        }
      />

      <br />
      <strong>Repeat pass</strong>
      <br />
      <input
        type="text"
        onChange={(e) =>
          SetSecondPass((secondPass) => (secondPass = e.target.value))
        }
        value={secondPass}
        style={
          firstPass === secondPass
            ? { background: "greenyellowyellow" }
            : { background: "tomato" }
        }
      />
    </>
  );
};


class ClassTimer extends React.Component {
  state = { seconds: this.props.seconds, minutes: this.props.minutes };

  componentWillMount() {
    this.state.seconds = this.props.seconds % 60;
    this.state.minutes = Math.floor(this.props.seconds / 60);
  }

  timer = () => {
    const { seconds, minutes } = this.state;
    console.log(seconds);
    if (seconds > 0) {
      this.setState(({ seconds }) => ({
        seconds: seconds - 1,
      }));
    }
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(this.timer);
      } else {
        this.setState(({ minutes }) => ({
          minutes: minutes - 1,
          seconds: 59,
        }));
      }
    }
  };
  stopInterval = () => {
    console.log("IntervalWasStopped");
    clearInterval(this.time);
    this.setState({ timerStatus: false });
  };

  startInterval = () => {
    console.log("IntervalWasStarted");
    this.time = setInterval(this.timer, 1000);
    this.setState({ timerStatus: true });
  };

  render() {
    return (
      <div>
        <h1>
          Component is render by {this.state.minutes}:{this.state.seconds}{" "}
          seconds
        </h1>

        <button
          onClick={
            !this.state.timerStatus ? this.startInterval : this.stopInterval
          }
        >
          {this.state.timerStatus ? "Stop counter" : "Start counter"}
        </button>
      </div>
    );
  }
}

const FuncTimerWithInputs = ({
  inpHours,
  inpMinutes,
  inpSeconds,
  refresh,
  render,
}) => {
  const [hours, setHours] = useState(inpHours);
  const [minutes, setMinutes] = useState(inpMinutes);
  const [seconds, setSeconds] = useState(inpSeconds);
  const [timerStatus, SetTimerStatus] = useState(false);

  const RenderField = render;

  const TimeButton = () =>
    SetTimerStatus((timerStatus) => {
      console.log(!timerStatus);
      return !timerStatus;
    });

  useEffect(() => {
    console.log("====>", hours, minutes, seconds);
  }, [hours, minutes, seconds]);

  useEffect(() => {
    let interval = null;
    if (timerStatus) {
      interval = setInterval(() => {
        setSeconds((seconds) => {
          if (seconds > 0) setSeconds(seconds - 1);
          else if (seconds === 0) {
            setMinutes((minutes) => {
              if (minutes > 0) {
                setMinutes(minutes - 1);
                setSeconds((seconds = 60));
              }
              if (minutes === 0 && seconds === 0) {
                if (hours > 0) {
                  setHours(hours - 1);
                  setMinutes((minutes = 59));
                  setSeconds((seconds = 60));
                } else if (hours === 0) {
                  setHours((hours) => {
                    if (hours === 0 && minutes === 0 && seconds === 0) {
                      clearInterval(interval);
                      return hours;
                    }
                    setMinutes((minutes = 59));
                    setSeconds((seconds = 60));
                  });
                }
                return minutes;
              }
            });
          }
          return seconds;
        });
      }, refresh);
    } else if (!timerStatus && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerStatus, seconds, refresh]);

  return (
    <>
      <RenderField seconds={seconds} minutes={minutes} hours={hours} />
      <input
        type="number"
        max="999"
        placeholder="Hours"
        onChange={(e) => setHours((hours) => (hours = e.target.value))}
      />
      <input
        type="number"
        max="59"
        placeholder="Minutes"
        onChange={(e) =>
          setMinutes((minutes) => (minutes = e.target.value * 1))
        }
      />
      <input
        type="number"
        max="59"
        placeholder="Seconds"
        onChange={(e) =>
          setSeconds((seconds) => (seconds = e.target.value * 1))
        }
      />
      <button onClick={TimeButton}>
        {timerStatus ? "Stop counter" : "Start counter"}
      </button>
    </>
  );
};


class Watches extends React.Component {
  lal = () => {
    console.log(
      this.props.seconds,
      this.secondLine,
      this.minuteLine,
      this.hourLine
    );
  };
  secondLine = {};
  minuteLine = {};
  hourLine = {};

  componentDidUpdate() {
    this.secondLine = {
      transform: "rotate(" + (this.props.seconds / 60) * 360 + "deg)",
    };

    this.minuteLine = {
      transform: `rotate(${
        (this.props.minutes / 60) * 360 + (this.props.seconds / 60) * 6
      }deg)`,
    };

    this.hourLine = {
      transform: `rotate(${
        (this.props.hours / 12) * 360 + (this.props.minutes / 60) * 30
      }deg)`,
    };
  }

  render() {
    return (
      <div className="watch">
        {this.lal()}
        <img
          src="http://draw.asmer.fe.a-level.com.ua/ClockFace/ClockFace_S.png"
          style={this.secondLine}
          className="line second-line"
        />
        <img
          src="http://draw.asmer.fe.a-level.com.ua/ClockFace/ClockFace_M.png"
          style={this.minuteLine}
          className="line minute-line"
        />
        <img
          src="http://draw.asmer.fe.a-level.com.ua/ClockFace/ClockFace_H.png"
          style={this.hourLine}
          className="line hour-line"
        />
      </div>
    );
  }
}

function TimerContainer({ seconds, minutes, hours }) {
  console.log(seconds);
  return (
    <div>
      <h2>
        {hours}:{minutes}:{seconds}
      </h2>
      <br />
      <Watches minutes={minutes} seconds={seconds} hours={hours} />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Spoiler header={"SPOILER"} children>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, quia
        enim illum ea eum laudantium odit modi esse minus impedit earum iusto
        officiis animi porro voluptatibus dolor ab et aspernatur!
      </Spoiler>
      <div style={{ margin: "50px" }}>
        <CRangeInput min={2} max={12} />
        <CPasswordInput min={5} />
      </div>
      <div style={{ margin: "50px" }}>
        <FRangeInput min={1} max={10} />
        <FPassword min={12} />
      </div>
      <FuncTimerWithInputs
        inpHours={0}
        inpMinutes={0}
        inpSeconds={0}
        refresh={1000}
        render={TimerContainer}
      />
      <ClassTimer minutes={0} seconds={62} />
    </div>
  );
}

export default App;
