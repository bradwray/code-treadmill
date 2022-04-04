import React from "react";
import ReactDOM from "react-dom";
import babyDucks from "../../public/FTD-Assets/babyDucks.gif";
import DoorOne from "../../components/FreeTheDucks/DoorOne.js";
import DoorTwo from "../../components/FreeTheDucks/DoorTwo.js";
import FirstDoor from "../../components/FreeTheDucks/FirstDoor.js";
import DecToBinary from "../../components/FreeTheDucks/DecToBinary.js";
import HexQuiz from "../../components/FreeTheDucks/HexQuiz";
import Colors from "../../components/FreeTheDucks/Colors";
import HexToBinary from "../../components/FreeTheDucks/HexToBinary";
import { withStyles } from "@material-ui/core/styles";
import Image from "next/image";

const styles = {
  ducks: {
    position: "relative",
    marginRight: "auto",
    width: "100%",
  },
};

class App extends React.Component {
  state = {
    //wrap each one of these in a generic door component that can generate a random background
    //this will help decrease code duplication
    door: [
      {
        time: 2400,
        open: false,
        puzzle: <HexQuiz />,
      },
      {
        time: 1000,
        open: false,
        puzzle: <DecToBinary />,
      },
      {
        time: 700,
        open: false,
        puzzle: <HexToBinary />,
      },
    ],
    developing: true,
  };

  componentDidMount = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  render = (styles) => {
    const { classes } = this.props;
    return (
      <div>
        {/**/}
        <Image
          className={classes.ducks}
          src={babyDucks}
          width={this.state.width * 0.8}
          height={this.state.height}
          layout="responsive"
        />
        <FirstDoor openTime={this.state.door[0].time} />
        <DoorOne openTime={this.state.door[1].time} />
        <DoorTwo openTime={this.state.door[2].time} />
      </div>
    );
  };
}
export default withStyles(styles)(App);
