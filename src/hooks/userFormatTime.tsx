const userFormatTime = () => {
  const formatTime = (slot: string) => {
    const [start, end] = slot.split("-");

    const formatTime = (time: string) => {
      const hours = parseInt(time.split(":")[0], 10);
      const minutes = time.split(":")[1];
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      return `${formattedHours}:${minutes} ${ampm}`;
    };

    return `${formatTime(start)} - ${formatTime(end)}`;
  };
  return { formatTime };
};

export default userFormatTime;
