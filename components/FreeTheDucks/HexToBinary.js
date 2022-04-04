import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  root: {
    height: 800,
    width: 800
  },
  container: {
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    marginTop: "100px",

    maxWidth: "349px",
    marginRight: "auto",
    marginLeft: "auto",
    backgroundColor: "#eee",
    borderStyle: "outset",
    borderWidth: "3px",
    borderRadius: "5px",
    padding: "10px 15px 10px 15px"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100px",
    backgroundColor: "#fff"
  },
  textFieldCorrect: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100px",
    backgroundColor: "#00dd00"
  },
  textFieldWrong: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100px",
    backgroundColor: "#dd0000"
  }
});

class HexToBinary extends React.Component {
  state = {
    answer: " ",
    nums: []
  };

  componentWillMount = () => {
    let tempArr = [];
    let number;
    for (let i = 0; i < 9; i++) {
      number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"][
        Math.floor(Math.random() * 16)
      ];
      while (
        tempArr.some(item => {
          return number === item.num;
        })
      ) {
        number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"][
          Math.floor(Math.random() * 16)
        ];
      }
      tempArr[i] = {
        num: number,
        ans: ""
      };
    }
    this.setState({ nums: tempArr });
  };

  allCorrect() {
    if (
      this.state.nums.every(item => {
        return item.correct;
      })
    ) {
      this.props.complete();
    }
  }

  checkIt = (guess, index) => {
    let tempArr = this.state.nums;
    if (
      guess ===
        parseInt(tempArr[index].num, 16)
          .toString(2)
          .padStart(4, "0") ||
      guess ===
        parseInt(tempArr[index].num, 16)
          .toString(2)
          .padStart(8, "0")
    ) {
      tempArr[index].correct = true;
    } else {
      tempArr[index].correct = false;
    }

    this.setState({
      nums: tempArr
    });
  };

  handleChange = index => event => {
    console.log(event.target.value);
    let tempArr = this.state.nums;
    tempArr[index].ans = event.target.value;
    this.checkIt(event.target.value, index);
    this.setState({
      nums: tempArr
    });
  };

  render() {
    let { classes } = this.props;
    let backgroundColor = "#f00";
    console.log(this.state);
    this.allCorrect();
    return (
      <div className={classes.root}>
        <form className={classes.container} noValidate autoComplete="off">
          {this.state.nums.map((item, index) => {
            let instructions = item.num + " to bin";
            let styling;
            if (this.state.nums[index].correct === false)
              styling = classes.textFieldWrong;
            else if (this.state.nums[index].correct === true)
              styling = classes.textFieldCorrect;
            else styling = classes.textField;
            return (
              <div>
                <TextField
                  id={index}
                  autoFocus={index === -1}
                  label={instructions}
                  className={styling}
                  value={this.state.nums[index].ans}
                  onChange={this.handleChange(index)}
                  margin="normal"
                  variant="outlined"
                />
              </div>
            );
          })}
        </form>
      </div>
    );
  }
}

HexToBinary.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HexToBinary);
