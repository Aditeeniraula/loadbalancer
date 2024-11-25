const ReplicaDetails = () => {
  return (
    <div className="flex-1 bg-white shadow-md rounded-lg p-4 h-65 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Replica Details</h2>
      <ul className="space-y-4">
        {[
          "Replica 1",
          "Replica 2",
          "Replica 3",
          "Replica 4",
          "Replica 5",
          "Replica 6",
        ].map((replica, index) => (
          <li
            key={index}
            className="flex items-center justify-between border p-2 rounded-lg"
          >
            <span>{replica}</span>
            <span
              className={`w-6 h-6 rounded-full ${
                index === 2
                  ? "bg-red-500"
                  : index === 3
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
            ></span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReplicaDetails;
