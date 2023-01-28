// import React, { useState } from 'react';

// const SearchBar = () => {
//   const [searchInput, setSearchInput] = useState('');
//   // const BarStyle = {
//   //   width: '20rem', background: '#F0F0F0', border: 'none', padding: '0.5rem',
//   // };
//   // return (
//   //   <input
//   //     style={BarStyle}
//   //     key="search-bar"
//   //     value={keyword}
//   //     placeholder="search news"
//   //     onChange={(e) => onChange(e.target.value)}
//   //   />
//   // );
//   const pupData = [
//     { name: 'Apollo', team: 'Team Ruff' },
//     { name: 'Asiago', team: 'Team Fluff' },
//     { name: 'Bacon', team: 'Team Fluff' },
//     { name: 'Betty', team: 'Team Ruff' },
//     { name: 'Beu', team: 'Team Ruff' },
//     { name: 'Butter Bean', team: 'Team Fluff' },
//     { name: 'Chickpea', team: 'Team Fluff' },
//     { name: 'Daisy', team: 'Team Ruff' },
//     { name: 'Davinci', team: 'Team Ruff' },
//     { name: 'Gilbert', team: 'Team Ruff' },
//     { name: 'Jimmy Kibble', team: 'Team Ruff' },
//     { name: 'Kira', team: 'Team Fluff' },
//     { name: 'Amanda', team: 'Team Fluff' },
//   ];

//   const handleChange = (e) => {
//     e.preventDefault();
//     setSearchInput(e.target.value);
//   };

//   if (searchInput.length > 0) {
//     pupData.filter((pup) => pup.name.match(searchInput));
//   }

//   return (
//     <div>

//       <input
//         type="search"
//         placeholder="Search here"
//         onChange={handleChange}
//         value={searchInput}
//       />

//       <table>
//         {/* <tr>
//           <th>Name</th>
//           <th>Team</th>
//         </tr> */}

//         {pupData.map((pup, index) => {
//           <div>
//             <tr>
//               <td>{pup.name}</td>
//               <td>{pup.team}</td>
//             </tr>;
//           </div>;
//         })}
//       </table>
//     </div>
//   );
// };

// export default SearchBar;
