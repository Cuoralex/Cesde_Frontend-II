import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Post from './components/Post';

function App() {
  return (
    <div className="w3-theme-l5">
      <Navbar />

      <div className="w3-container w3-content" style={{maxWidth:'1400px', marginTop:'80px'}}>    
        <div className="w3-row">
          <Sidebar />
          
          {/* Middle Column */}
          <div className="w3-col m7">
            {/* Status input card */}
            <div className="w3-row-padding">
              <div className="w3-col m12">
                <div className="w3-card w3-round w3-white">
                  <div className="w3-container w3-padding">
                    <h6 className="w3-opacity">Social Media template by w3.css</h6>
                    <textarea 
                      className="w3-input w3-border w3-padding"
                      placeholder="¿Qué estás pensando?"
                      style={{ height: "60px", resize: "none" }}
                    />
                    <button type="button" className="w3-button w3-theme"><i className="fa fa-pencil"></i> &nbsp;Post</button> 
                  </div>
                </div>
              </div>
            </div>
            
            {/* John Doe Post
            <div className="w3-container w3-card w3-white w3-round w3-margin"><br />
              <img src="https://www.w3schools.com/w3images/avatar2.png" alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{width:'60px'}} />
              <span className="w3-right w3-opacity">1 min</span>
              <h4>John Doe</h4><br />
              <hr className="w3-clear" />
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <div className="w3-row-padding" style={{margin:'0 -16px'}}>
                <div className="w3-half">
                  <img src="https://www.w3schools.com/w3images/lights.jpg" style={{width:'100%'}} alt="Northern Lights" className="w3-margin-bottom" />
                </div>
                <div className="w3-half">
                  <img src="https://www.w3schools.com/w3images/nature.jpg" style={{width:'100%'}} alt="Nature" className="w3-margin-bottom" />
                </div>
              </div>
              <button type="button" className="w3-button w3-theme-d1 w3-margin-bottom"><i className="fa fa-thumbs-up"></i> &nbsp;Like</button> 
              <button type="button" className="w3-button w3-theme-d2 w3-margin-bottom"><i className="fa fa-comment"></i> &nbsp;Comment</button> 
            </div> */}

            <Post
              id={1}
              name="Judy Orozco"
              avatar="https://i.pravatar.cc/150?img=3"
              time="Hace 5 min"
              content="Este es mi primer post funcional"
              images={["https://picsum.photos/500"]}
            />

            {/* Jane Doe Post */}
            <div className="w3-container w3-card w3-white w3-round w3-margin"><br />
              <img src="https://www.w3schools.com/w3images/avatar5.png" alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{width:'60px'}} />
              <span className="w3-right w3-opacity">16 min</span>
              <h4>Jane Doe</h4><br />
              <hr className="w3-clear" />
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <button type="button" className="w3-button w3-theme-d1 w3-margin-bottom"><i className="fa fa-thumbs-up"></i> &nbsp;Like</button> 
              <button type="button" className="w3-button w3-theme-d2 w3-margin-bottom"><i className="fa fa-comment"></i> &nbsp;Comment</button> 
            </div>

            {/* Angie Jane Post */}
            <div className="w3-container w3-card w3-white w3-round w3-margin"><br />
              <img src="https://www.w3schools.com/w3images/avatar6.png" alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{width:'60px'}} />
              <span className="w3-right w3-opacity">32 min</span>
              <h4>Angie Jane</h4><br />
              <hr className="w3-clear" />
              <p>Have you seen this?</p>
              <img src="https://www.w3schools.com/w3images/nature.jpg" style={{width:'100%'}} className="w3-margin-bottom" alt="Nature" />
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <button type="button" className="w3-button w3-theme-d1 w3-margin-bottom"><i className="fa fa-thumbs-up"></i> &nbsp;Like</button> 
              <button type="button" className="w3-button w3-theme-d2 w3-margin-bottom"><i className="fa fa-comment"></i> &nbsp;Comment</button> 
            </div>
          </div>
          
          {/* Right Column */}
          <div className="w3-col m2">
            <div className="w3-card w3-round w3-white w3-center">
              <div className="w3-container">
                <p>Upcoming Events:</p>
                <img src="https://www.w3schools.com/w3images/forest.jpg" alt="Forest" style={{width:'100%'}} />
                <p><strong>Holiday</strong></p>
                <p>Friday 15:00</p>
                <p><button className="w3-button w3-block w3-theme-l4">Info</button></p>
              </div>
            </div>
            <br />
            <div className="w3-card w3-round w3-white w3-center">
              <div className="w3-container">
                <p>Friend Request</p>
                <img src="https://www.w3schools.com/w3images/avatar6.png" alt="Avatar" style={{width:'50%'}} /><br />
                <span>Jane Doe</span>
                <div className="w3-row w3-opacity">
                  <div className="w3-half"><button className="w3-button w3-block w3-green w3-section" title="Accept"><i className="fa fa-check"></i></button></div>
                  <div className="w3-half"><button className="w3-button w3-block w3-red w3-section" title="Decline"><i className="fa fa-remove"></i></button></div>
                </div>
              </div>
            </div>
            <br />
            <div className="w3-card w3-round w3-white w3-padding-16 w3-center"><p>ADS</p></div>
            <br />
            <div className="w3-card w3-round w3-white w3-padding-32 w3-center"><p><i className="fa fa-bug w3-xxlarge"></i></p></div>
          </div>
        </div>
      </div>
      <br />
<footer className="w3-container w3-theme-d3 w3-padding-16">
  <h5>Footer</h5>
</footer>
<footer className="w3-container w3-theme-d5">
  <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank" rel="noreferrer">w3.css</a></p>
</footer>
    </div>
  );
}

export default App;