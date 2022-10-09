import PropTypes from 'prop-types';

export default function Footer({ clearCompleted, itemsLeft, children }) {
  return (
    <footer className="footer">
      <span className="todo-count">{itemsLeft} items left</span>
      {children}
      <button type="button" className="clear-completed" onClick={() => clearCompleted()}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  clearCompleted: () => {},
  itemsLeft: 0,
};

Footer.propTypes = {
  clearCompleted: PropTypes.func,
  itemsLeft: PropTypes.number,
};
