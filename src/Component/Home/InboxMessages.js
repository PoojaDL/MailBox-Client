import htmlToFormattedText from "html-to-formatted-text";

const InboxMessages = (props) => {
  return (
    <tr>
      <td className="py-3">{props.sender}</td>
      <td className="py-3">{props.subject}</td>
      <td className="py-3">{htmlToFormattedText(props.message)}</td>
      <td className="py-3">{props.timings}</td>
    </tr>
  );
};

export default InboxMessages;
