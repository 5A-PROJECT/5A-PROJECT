import { decorate, observable, action } from 'mobx';
import PortfolioRepository from '../../repositories/portfolio/PortfolioRepository';
import { fakePf } from './fakePf';

export default class PortfolioStore {
  constructor(root) {
    this.root = root;
  }
  /**
   * observable
   */
  portfolios = []; // 유저의 현재 포트폴리오들
  count = null;
  loading = {
    getMyPortfolios: false,
    addPortfolilo: false,
    getPortfolioById: false,
    addStock: false,
  };
  selectedPortfolio = null;

  /**
   * 현재 선택된 포폴 정리
   */
  clearSelectedPortfolio = () => {
    this.selectedPortfolio = null;
  };

  /**
   * 본인의 전체 포폴리스트 가져오기
   */
  getMyPortfolios = async () => {
    this.loading['getMyPortfolios'] = true;
    const { token } = this.root.authStore;
    try {
      const res = await PortfolioRepository.getPortfolios(token);
      const { data, count } = res.data;
      this.portfolios = data;
      this.count = count;
    } catch (e) {
      alert(e);
    }
    this.loading['getMyPortfolios'] = false;
  };

  /**
   * 포폴 추가하기
   */
  addPortfolilo = async (portfolio) => {
    let isAdded = true;
    this.loading['addPortfolilo'] = true;
    const { token } = this.root.authStore;
    try {
      const res = await PortfolioRepository.createPortfolio(portfolio, token);
      const { id, created_at } = res.data;
      this.portfolios.push({
        id,
        created_at,
        ...portfolio,
      });
    } catch (e) {
      alert(e);
      isAdded = false;
    }
    this.loading['addPortfolilo'] = false;
    return isAdded;
  };

  /**
   * 해당 아이디 포폴 가져오기
   */
  getPortfolioById = async (portfolioId, token) => {
    try {
      /* API 완료 후 수정
      const res = await PortfolioRepository.getPortfolioById(
        portfolioId,
        token,
      );

      const { data: portfolio } = res.data;
      */

      // TODO: 받은 응답의 포폴로 교체하기.
      this.selectedPortfolio = fakePf[portfolioId - 1];
      return true;
    } catch (e) {
      alert(e);
      return false;
    }
  };

  addStock = async (portfolioId, stock, token) => {
    try {
      const res = await PortfolioRepository.createStock(
        portfolioId,
        stock,
        token,
      );

      // 리턴받은 아이디 받아서 넣기
      const { id } = res.data;

      // 추가
      this.selectedPortfolio.stocks.push({
        id,
        ...stock,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

decorate(PortfolioStore, {
  portfolios: observable,
  count: observable,
  loading: observable,
  selectedPortfolio: observable,
  create: action,
  clearSelectedPortfolio: action,
  getMyPortfolios: action,
  getPortfolioById: action,
  addStock: action,
});
