import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';


  const app = new Clarifai.App({
 apiKey: 'a4d9bb4e0d88477a8035c81a13337192'
});

  const particlesOptions = {
            		particles: {
            			number: {
            				value: 100,
            				density: {
            					enable: true,
            					value_area: 800

            				}
            			}
            		}
            	}

class App extends React.Component  {
	constructor(){
		super();
		this.state = {
			input: '',
			imageUrl:'',
			box:{
				leftCol: 0,
		 		topRow: 0,
		 		rightCol: 0,
		 		bottomRow: 0
		 	},
		 	route: 'signin', //to track where we are on the page
		 	isSignedIn: false
		}
	}


 calculateFaceLocation = (data) => {
 	const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
 	const image = document.getElementById('inputImage');
 	const width = Number(image.width);
 	const height = Number(image.height);
 	return {
 		leftCol: clarifaiFace.left_col * width,
 		topRow: clarifaiFace.top_row * height,
 		rightCol: width - (clarifaiFace.right_col * width),
 		bottomRow: height - (clarifaiFace.bottom_row * height),
 	};
 }


 displayFaceBox = (box) => {
 	this.setState({box: box});
 }


 onInputChange = (event) => {
  	this.setState({input: event.target.value})
  }



  onButtonSubmit = (event) => {
  	this.setState({imageUrl: this.state.input });

  	app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)  //using imageUrl throws an error becuz of teh way setState works.
        .then(response => {
        	this.displayFaceBox( this.calculateFaceLocation(response) );
        })
        .catch(err => console.log(err));
  }



onRouteChange = (route) => {
	if(route ==='signout'){
		this.setState({isSignedIn: false})
	}
	else if (route === 'home') {
		this.setState({isSignedIn: true});
	}
	this.setState({route: route});
}


render() {
	return (
    <div className="App">
	  <Particles className='particules' params={particlesOptions}/>
      <Navigation isSignedIn= {this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
      { this.state.route === 'home' 
	      ? <div>
		      <Logo />
		      <Rank />
		      <ImageLinkForm  onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
		      <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} /> 
		    </div>  
	      : (
	      	this.state.route ==='signin' 
	      	? <Signin onRouteChange={this.onRouteChange}/> //we're defining not calling teh fct here, so that it execute only on click, and not on rendering
	       	: <Register onRouteChange={this.onRouteChange}/>
	  		)
	  }
      
    </div>
  );
}          
  
}

export default App;