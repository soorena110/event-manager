import TokenManagerComponent from "./TokenManagementComponent";

const TokenManager = new TokenManagerComponent();
export default TokenManager;

(window as any).$tokenManager = TokenManager;