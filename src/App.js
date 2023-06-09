import React from "react";
import "./style/App.css";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Game from "./components/Game";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBoard: false,
      isModalVisible: false,
      theme: "Light",
      user: undefined,
      gameMode: undefined,
    };
  }

  saveSettings = () => {
    this.settings = {
      gameMode: this.state.gameMode,
      user: this.state.user,
    };
    if (this.settings.user && this.settings.gameMode) {
      this.setState((prevState) => ({ showBoard: !prevState.showBoard }));
    } else {
      this.setState((prevState) => ({
        isModalVisible: !prevState.isModalVisible,
      }));
    }
  };

  themeSwitcher = () => {
    const boardDOM = document.getElementById("board");

    if (boardDOM) {
      if (this.state.theme === "Light") {
        document.body.style.backgroundColor = "#222222";
        boardDOM.style.color = "white";
        for (let i of document.getElementsByClassName("cell")) {
          i.style.border = "1px solid white";
        }

        this.setState({ theme: "Dark" });
      } else {
        document.body.style.backgroundColor = "white";
        boardDOM.style.color = "#222222";
        for (let i of document.getElementsByClassName("cell")) {
          i.style.border = "1px solid #333333";
        }

        this.setState({ theme: "Light" });
      }
    }
  };

  closeModal = () => {
    this.setState((prevState) => ({
      isModalVisible: !prevState.isModalVisible,
    }));
  };

  setGameMode = (gameMode) => {
    this.setState(() => ({ gameMode: gameMode }));
  };

  setPickOfUser = (pick) => {
    this.setState(() => ({ user: pick }));
  };

  render() {
    if (this.state.showBoard) {
      return (
        <>
          <Button className="theme-switcher" onClick={this.themeSwitcher}>
            Switch to {this.state.theme === "Light" ? "Dark" : "Light"} Theme
          </Button>
          <Game settings={this.settings} />
        </>
      );
    }
    return (
      <>
        <Modal show={this.state.isModalVisible}>
          <Modal.Header>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              You must arrange all settings before playing the game <br />
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>
              Close
            </Button>
            <Button variant="primary" onClick={this.closeModal}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>

        <div id="settings-gui">
          <div>
            <h2>Select Game Mode</h2>
            <div className="option" onClick={() => this.setGameMode("PvP")}>
              Player vs Player
            </div>
            <div className="option" onClick={() => this.setGameMode("PvC")}>
              Player vs Computer
            </div>
          </div>
          <div className="mt-5">
            <h2>Select X/O</h2>
            <div className="option" onClick={() => this.setPickOfUser("X")}>
              <b>X</b>
            </div>
            <div className="option" onClick={() => this.setPickOfUser("O")}>
              <b>O</b>
            </div>
          </div>
          <br /> <br /> <br />
          <div className="setting-info">Game Mode: {this.state.gameMode}</div>
          <div className="setting-info">User's Pick: {this.state.user}</div>
          <br />
          <Button onClick={this.saveSettings}>OK</Button>
        </div>

        <a
          className="github-link"
          href="https://github.com/Unreol-Freedom/tic-tac-toe"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
      </>
    );
  }
}

export default App;
