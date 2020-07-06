// export *not* default
export function If(props) {
    const { condition, children } = props;
  
    if (condition)
      return children;
  
    return null;
  }
  
  // Opposite of "if"
  export function Unless(props) {
    const { condition, children } = props;
  
    return !condition ? children : null;
  }