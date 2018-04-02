var Books = React.createClass({  
    render: function() {
      return (
        <table>
          <thead>
            <tr>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            <Book title='Professional Node.js'></Book>
            <Book title='Node.js Patterns'></Book>
          </tbody>
        </table>
      );
    }
  });
  
  var Book = React.createClass({  
    render: function() {
      return (
        <tr>
          <td>{this.props.title}</td>
        </tr>
      );
    }
  });
  
  ReactDOM.render(<Books />, document.getElementById('container'));  