import './App.css';

declare var ZoomMtgEmbedded

// Enter your own configuration values here
const apiKey = '';
const name = '';
const meetingNumber = '';
const signatureEndpoint = ''

const client = ZoomMtgEmbedded.createClient();

function ComponentView() {
  
  const startMeeting = (signature) => {
    let meetingSDKElement = document.getElementById('meetingSDKElement');
    // let chatElement = document.getElementById('chatElement');
    meetingSDKElement.style.display = "flex";
    client.init({
      debug: true,
      zoomAppRoot: meetingSDKElement,
      language: 'en-US',
      // Unblock the following code snippets to apply customizations
      // customize: {
      //   video: {
      //     popper: {
      //       disableDraggable: true,
      //     }
      //   },
      //   chat: {
      //     popper: {
      //       disableDraggable: true,
      //       anchorElement: chatElement,
      //     }
      //   }
      // }
    });
    client.join({
      apiKey,
      signature,
      meetingNumber,
      userName: name,
    })
  };

  const getSignature = (e) => {
    const SIGNATURE_OPTIONS = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Adjust the role as appropriate
      body: JSON.stringify({ meetingNumber, role: 1 }),
    };

    // Change the following code block to generate your own signature
    fetch(signatureEndpoint, SIGNATURE_OPTIONS)
      .then((data) => data.json())
      .then(({ signature }) => !!signature && startMeeting(signature));
  };

 return (
   <>
    <div className="flex-center">
      <button
        type="primary"
        className="button"
        onClick={getSignature}
      >
        Start Meeting
      </button>
    </div>
    <div className="zoom-container">
      <div id="meetingSDKElement" />
      <div id="chatElement" />
    </div>
   </>
 );
}

function App() {
  return <ComponentView />
}

export default App;
