export function Square({children, isSelected, updateboard, index}) {
  
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateboard(index);
  }

  return (
    <div className={className} onClick={handleClick}>
      {children} </div>
  )
}