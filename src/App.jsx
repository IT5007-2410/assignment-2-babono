/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, name: 'Jack', 
    phone: 88885555,
    dob: "1892-05-15",
    bookingTime: new Date(),
  },
  {
    id: 2, name: 'Rose', 
    phone: 88884444,
    dob: "1895-02-17",
    bookingTime: new Date(),
  },
];

function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/}
  return (
    <tr>
	  {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
      <td>{props.index + 1}</td>
      <td>{props.traveller.name}</td>
      <td>{props.traveller.phone}</td>
      <td>{props.traveller.dob}</td>
      <td>{props.traveller.bookingTime.toLocaleString()}</td>
    </tr>
  );
}

function Display(props) {
  
	/*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/
  return (
    <>
      <h2>List of Travellers</h2>
      {props.travellers.length === 0 ? (  // Check if the travellers list is empty
        <p>Passenger not found!</p>  // Display message if there are no passengers
      ) : (
      <table className="bordered-table">
        <thead>
          <tr>
            {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
            <th>No</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Date of Birth</th>
            <th>Booking Time</th>
          </tr>
        </thead>
        <tbody>
          {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
          {props.travellers.map((traveller,index) => (
            <TravellerRow key={index} index={index} traveller={traveller} />
          ))}
        </tbody>
      </table>
      )}
    </>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    const travellerName = e.target.travellername.value.trim();
    const travellerPhone = e.target.travellerphone.value.trim();
    const travellerDOB = e.target.travellerdob.value;

    if (travellerName && travellerPhone && travellerDOB) {
      // Create the passenger object
      const passenger = {
        name: travellerName,
        phone: travellerPhone,
        dob: travellerDOB
      };

      // Pass the passenger object to the parent component
      this.props.bookTraveller(passenger);

      // Clear the form
      e.target.travellername.value = ''; 
      e.target.travellerphone.value = ''; 
      e.target.travellerdob.value = '';
    }
  }

  render() {
    return (
      <>
        <h2>Add Traveler</h2>
        <form name="addTraveller" onSubmit={this.handleSubmit} className="form">
          {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
          <div className="form-group">
            <label htmlFor="travellername">Name:</label>
            <input type="text" id="travellername" name="travellername" placeholder="Name" required/>
          </div>
          <div className="form-group">
              <label htmlFor="travellerphone">Phone Number:</label>
              <input type="number" id="travellerphone" name="travellerphone" placeholder="Phone Number" required />
          </div>
          <div className="form-group">
            <label htmlFor="travellerdob">Date of Birth:</label>
            <input type="date" name="travellerdob" placeholder="Date of Birth" required />
          </div>
          <button className="button action">Add</button>
        </form>
      </>
    );
  }
}


class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/    
    const travellerName = e.target.travellername.value.trim(); // Get the name from the input field

    if (travellerName) {
      // Construct the passenger object with only the name
      const passenger = {
        name: travellerName
      };

      this.props.deleteTraveller(passenger); // Pass the passenger object with the name
      e.target.travellername.value = ''; // Clear the input field after submission
    }
  }

  render() {
    return (
      <>
        <h2>Delete Traveller by Name</h2>
        <p><i>- If there are multiple passengers with the same name, all of them will be deleted.</i></p>
        <p><i>- Case sensitive.</i></p>
        <form name="deleteTraveller" onSubmit={this.handleSubmit} className="form">
            {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}	        
            <div className="form-group">
                <label htmlFor="travellername">Name:</label>
                <input type="text" id="travellername" name="travellername" placeholder="Name" required/>
            </div>
            <button className="button delete">Delete</button>
        </form>
      </>
      
    );
  }
}

class Homepage extends React.Component {
	constructor(props) {
	super(props);
  const totalSeats = props.totalSeats; // Total number of seats
  const occupiedSeats = props.travellers.length; // Number of occupied seats based on travellers array
  this.state = {
    seats: Array(totalSeats).fill(true).map((seat, index) => index >= occupiedSeats ? true : false), // false for occupied, true for free
  };
	}
  // Lifecycle method to set the state when the component is first loaded
  componentDidMount() {
    this.updateSeatsBasedOnTravellers();
  }

  // Lifecycle method to update the state when props change (e.g., travellers)
  componentDidUpdate(prevProps) {
    if (prevProps.travellers !== this.props.travellers) {
      this.updateSeatsBasedOnTravellers();
    }
  }

  // Method to update seats state based on the length of travellers
  updateSeatsBasedOnTravellers() {
    const totalSeats = this.props.totalSeats;
    const occupiedSeats = this.props.travellers.length; // Number of occupied seats based on travellers array

    const newSeats = Array(totalSeats).fill(true).map((seat, index) => index >= occupiedSeats ? true : false); // false for occupied, true for free

    this.setState({ seats: newSeats });
  }
	render(){
    // Count the number of free and occupied seats
    const freeSeats = this.state.seats.filter(isFree => isFree).length;
    const occupiedSeats = this.state.seats.length - freeSeats;
    return (
      <div>
        {/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
        <h2>Seats Plan</h2>                
        <div className="seatMap">
          <h3>💺 Total Seats: {this.state.seats.length}</h3>
          <div className="seatMapLegend">
            <h4>🟩 Available Seats: {freeSeats}</h4>
            <h4>⬜ Seats Taken: {occupiedSeats}</h4>
          </div>
          <div className="seatMapGrid">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
              {this.state.seats.map((isFree, index) => (
                <div
                  key={index}
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: isFree ? '#32B215' : '#D9D9D9',
                    borderRadius: '10px',
                    margin: '0 auto'                
                  }}
                >
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { 
      travellers: [],
      totalSeats: 10, 
      selector: 1
    };
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
  }

  setSelector(value)
  {
  	/*Q2. Function to set the value of component selector variable based on user's button click.*/
    this.setState({ selector: value });
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(passenger) {
    /*Q4. Write code to add a passenger to the traveller state variable.*/
    // Find the next available seat (if any)
    const totalSeats = this.state.totalSeats; // Get the total number of seats

    // Check if there are available seats
    if (this.state.travellers.length >= totalSeats) {
      alert('No more available seats!'); // Show an alert if seats are full
      return; // Exit the function, no more bookings allowed
    }

    // Check for next available ID
    let nextId = 1;
    if (this.state.travellers.length > 0) {
      // Find the highest current ID and increment it
      nextId = Math.max(...this.state.travellers.map(traveller => traveller.id)) + 1;
    }

    const newTraveller = {
      id: nextId, // Unique ID based on highest current ID
      ...passenger, // Spread the passenger object to include name, phone, etc.
      bookingTime: new Date().toLocaleString() // Current date and time
    };

    // Add the new traveller to the list
    this.setState((prevState) => ({
      travellers: [...prevState.travellers, newTraveller]      
    }));
    this.setSelector(1) // Navigate back to the Homepage
  }

  deleteTraveller(passenger) {
	  /*Q5. Write code to delete a passenger from the traveller state variable.*/
    /* 
      The .filter() method in JavaScript is used to create a new array that includes only the elements that meet a specific condition. It does not modify the original array; instead, it returns a new array with the filtered elements.
    */
    const passengerExists = this.state.travellers.some(traveller => traveller.name === passenger.name);

    if (!passengerExists) {
      alert('Passenger name not found!'); // Show alert if passenger does not exist
      return;
    }

    this.setState((prevState) => ({
      travellers: prevState.travellers.filter(traveller => traveller.name !== passenger.name)      
    }));
    this.setSelector(1) // Navigate back to the Homepage
  }
  
  render() {
    return (
      <>
        <div className="topHeader">
            <div className="wrapper">
                <h1>🚆 Ticket to Ride</h1>
            </div>
        </div>
        <div className="midHeader">
            <div className="wrapper">
                <h4>Made for IT5007 Assignment 2 by Muhammad Nurul Akbar (A0310016A)</h4>
            </div>                            
        </div>
        <div className="botHeader">
            <div className="wrapper">
                {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/} 
                {/* Navigation bar */}
                <button className="button" onClick={() => this.setSelector(1)}>Seats Plan</button>
                <button className="button" onClick={() => this.setSelector(2)}>Travellers</button>
                <button className="button" onClick={() => this.setSelector(3)}>Add Traveller</button>
                <button className="button" onClick={() => this.setSelector(4)}>Delete Traveller</button>
            </div>                            
        </div>
        <div className="main">
          <div className="wrapper">
            {/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
            {/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
            {/* Conditionally render components based on selectedPage */}
            {this.state.selector === 1 && <Homepage travellers={this.state.travellers} totalSeats={this.state.totalSeats} />}
            {/*Q3. Code to call component that Displays Travellers.*/}
            {this.state.selector === 2 && <Display travellers={this.state.travellers}/>}
            {/*Q4. Code to call the component that adds a traveller.*/}
            {this.state.selector === 3 && <Add bookTraveller={this.bookTraveller} />}
            {/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
            {this.state.selector === 4 && <Delete deleteTraveller={this.deleteTraveller} />}
          </div>
        </div>
        <div className="footer">
            <div className="wrapper">
                <h5>Copyright &copy; 2024. All rights reserved.</h5>
            </div>                            
        </div> 
      </>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
