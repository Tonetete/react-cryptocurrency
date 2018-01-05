export function setTotalBenefit (totalBenefit) {
  // selectBook is an ActionCreator, it needs to return an action,
  // an object with a type property.
  return {
    type: 'SET_TOTAL_BENEFIT',
    payload: totalBenefit
  }
}
