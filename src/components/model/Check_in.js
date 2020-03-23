
import React, { Component } from 'react';


class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVideoLoading: true,
      src: [],
      open: true
    };
    this.videoTag = React.createRef()
    this.canvas = React.createRef();

    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    // this.setState({ open: this.props.match.params.open })

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then(stream => {
        const video = this.videoTag.current;
        video.srcObject = stream;
        video.setAttribute("playsinline", true);
        video.play();
        requestAnimationFrame(this.tick);

      });
  }

  chenge = () => {
    this.setState({open:false})
  }



  tick() {
    // this.props.match.params.open?this.setState({isVideoLoading:true}):this.setState({isVideoLoading:false})
    // this.setState({ open: this.props.match.params.open })

    const video = this.videoTag.current;

    const checkVideoState = setInterval(() => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        clearInterval(checkVideoState);

        this.setState({ isVideoLoading: false });

        const canvasElement = this.canvas.current;
        const canvas = canvasElement.getContext("2d");

        canvasElement.height = video.videoHeight;
        canvasElement.width = video.videoWidth;
        canvas.drawImage(
          video,
          0,
          0,
          canvasElement.width,
          canvasElement.height

        );

        var can = document.getElementsByTagName("canvas");
        var src = can[0].toDataURL("image/png");
        // console.log('iiii', src)

        // console.log('qqq', canvas)
        this.setState({ src: src })
        console.log('222', this.state.src)

        requestAnimationFrame(this.tick);
          if (!this.state.open) {
            clearInterval()
          }
      }
    }, 3000//时间1000
    );

  }
  render() {
    // console.log('9898', this.props.match.params.open)
    // console.log('open', this.state.open)
    return (
      <div style={{ width: '100%', height: "100%" }}>
        <video
          ref={this.videoTag}
          // width="400"
          // height="400"
          autoPlay
        />

        <hr />
        {/* <img src={this.state.src}></img> */}
        {/* <hr/> */}
        {/* <video
          ref={this.videoTag}
          width="400"
          height="400"
          autoPlay
          style={{ display: "none" }} */}
        />
        {/* <canvas ref={this.canvas} /> */}

        <button onClick={this.chenge}>暂停</button>

        {!this.isVideoLoading && <canvas ref={this.canvas}
          style={{ display: "none" }}
        />}

        {this.isVideoLoading && <p>Please wait while we load the video stream.</p>}
      </div>
    );
  }
}

export default Test;