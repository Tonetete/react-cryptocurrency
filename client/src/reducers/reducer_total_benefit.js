// State argument is not application state, only the State
// that reducer is responsible for
export default function (state = {}, action) {
  switch (action.type) {
    case 'SET_TOTAL_BENEFIT':
      return {
        ...state,
        totalBenefitEUR: action.payload.totalBenefitEUR,
        totalBenefitUSD: action.payload.totalBenefitUSD
      }
    default:
      return state
  }
}
