export const CustomerInfoForm = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleCustomerInfoSubmit = () => {
    if (firstname.length == 0 || lastname.length == 0) {
      alert(
        "Please enter valid first and last name for order pick-up and verification"
      );
      return;
    }
    dispatch(addCustomerInfo(firstname, lastname));
    setFirstname("");
    setLastname("");
    setSuccess(true);
  };
  return (
    <div className="customer_form">
      <div>
        <p>Enter Your Name:</p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <input
            name="firstname"
            placeholder="firstname"
            required
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            name="lastname"
            placeholder="lastname"
            required
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <button
          className="submitOrder-btn"
          onClick={() => handleCustomerInfoSubmit()}
        >
          {success ? "Edit" : "Submit"}
        </button>
      </div>
    </div>
  );
};