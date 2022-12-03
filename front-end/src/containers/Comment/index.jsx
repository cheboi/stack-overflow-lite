// import { Mention, MentionsInput } from "react-mentions";
// import styles from "./comment.module.css";

// function Comment() {
//   const [emojiValue, setEmojiValue] = useState([]);
//   const notMatchingRegex = /($a)/;

//   useEffect(() => {
//     fetch(
//       "https://gist.githubusercontent.com/oliveratgithub/0bf11a9aff0d6da7b46f1490f86a71eb/raw/d8e4b78cfe66862cf3809443c1dba017f37b61db/emojis.json"
//     )
//       .then((data) => {
//         return data.json();
//       })
//       .then((jsonData) => {
//         setEmojiValue(jsonData.emojis);
//       });
//   }, []);
//   const queryEmojis = (query, callback) => {
//     if (query.length === 0) return;
//     const filterValue = emojiValue
//       .filter((emoji) => {
//         return emoji.name.indexOf(query.toLowerCase()) > -1;
//       })
//       .slice(0, 10);
//     return filterValue.map(({ emoji }) => ({ id: emoji }));
//   };
//   const users = [
//     {
//       id: "isaac",
//       display: "Isaac Newton",
//     },
//     {
//       id: "sam",
//       display: "Sam Victor",
//     },
//     {
//       id: "emma",
//       display: "emmanuel@nobody.com",
//     },
//   ];

//   return (
//     <div className={styles.form}>
//       <section className={styles.formCard}>
//         <h2 className={styles.formTitle}>Comment Form</h2>
//         {/* <input
//           type="text"
//           value={formState.username}
//           onChange={(e) =>
//             setFormState({ ...formState, username: e.target.value })
//           }
//           placeholder="Input Your Name"
//         /> */}
//         <MentionsInput
//           placeholder="Add Comment. Use '@' for mention"
//           value={formState.comment}
//           onChange={(e) =>
//             setFormState({ ...formState, comment: e.target.value })
//           }
//           style={mentionsInputStyle}
//         >
//           <Mention style={mentionStyle} data={users} />
//         </MentionsInput>
//         <button onClick={submit}>Submit</button>
//       </section>
//       {comments.length === 0 ? null : (
//         <section>
//           {comments.map((comment, i) => (
//             <div className={styles.commentCard} key={i}>
//               <p className={styles.username}>
//                 {comment.username} on {date}
//               </p>
//               <h2>{comment.comment}</h2>
//             </div>
//           ))}
//         </section>
//       )}
//     </div>
//   );
// }
// export default Comment;
