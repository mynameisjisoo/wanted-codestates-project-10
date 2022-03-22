// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import Suggestion from './Suggestion';

// const SuggestionList = ({ data, loading }) => {
//   const [text, setText] = useState('검색중');
//   useEffect(() => {
//     if (data !== null && data.length === 0) {
//       setText('추천 검색어 없음');
//     } else if (loading) {
//       setText('검색중');
//     } else if (data) {
//       setText('추천검색어');
//     }
//   }, [data, loading]);

//   return (
//     <ListContainer>
//       <p>{text}</p>
//       <ul>
//         {data?.map((el) => (
//           <Suggestion key={el.id} keyword={el.name} />
//         ))}
//       </ul>
//     </ListContainer>
//   );
// };

// const ListContainer = styled.div`
//   background-color: #ffff;
//   text-align: left;
//   border-radius: 2rem;
//   margin-top: 0.5rem;
//   padding: 1.5rem 0;

//   & > p {
//     color: #788287;
//     font-size: 0.8rem;
//     margin-left: 1.5rem;
//   }
// `;
// export default SuggestionList;
