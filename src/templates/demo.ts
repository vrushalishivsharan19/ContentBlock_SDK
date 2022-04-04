import ejs from 'ejs';

export default ejs.compile(`
  <ul>
    <% CoremediaCollection.items.forEach(function(item){ %>
      <% if (item) { %>
        <li style="color: pink"><%= item.shortTeaserTitle %></li>
        <% } %>
    <% }); %>
  </ul>
`);
