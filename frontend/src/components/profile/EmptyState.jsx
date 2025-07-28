const EmptyState = ({ message }) => (
  <div className="text-center py-10 text-white/60 text-sm">
    {message || "No assets assigned yet."}
  </div>
);

export default EmptyState;
