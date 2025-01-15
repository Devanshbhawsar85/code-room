import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Make sure this URL is correct

const App = () => {
  useEffect(() => {
    // Log when connected to the server
    socket.on("connect", () => {
      console.log("Connected to server with socket ID:", socket.id);
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  return <div>App</div>;
};

export default App;
