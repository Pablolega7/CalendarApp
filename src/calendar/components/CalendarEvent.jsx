
export const CalendarEvent = ({ event }) => {
  const { title, user } = event;

  return (
    <>
      <strong style={{ whiteSpace: "normal" }}> {title} </strong>
      <span> - {user.name} </span>
    </>
  );
};
