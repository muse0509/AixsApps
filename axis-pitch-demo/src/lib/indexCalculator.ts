// src/lib/indexCalculator.ts

import { Asset, IndexDefinition } from '@/data/mockData';

// 計算結果の型
export interface IndexHistoryPoint {
  date: string;
  value: number;
}

/**
 * すべての資産の価格履歴の日付リストを取得します。
 * @param assets - 全資産のデータ
 * @returns 日付文字列の配列
 */
const getTimeline = (assets: Record<string, Asset>): string[] => {
  // ここでは簡単のため、最初の資産(BTC)の日付リストを全体のタイムラインとして使用します
  return assets['BTC'].prices.map(p => p.date);
};

/**
 * 特定の日付における資産の価格を取得します。
 * @param asset - 対象の資産
 * @param date - 日付
 * @returns 価格。見つからなければ0を返します。
 */
const getPriceOnDate = (asset: Asset, date: string): number => {
  const pricePoint = asset.prices.find(p => p.date === date);
  return pricePoint ? pricePoint.price : 0;
};

/**
 * インデックスの価格履歴を計算します。
 * @param indexDef - 計算したいインデックスの定義
 * @param assets - 全資産のデータ
 * @returns インデックスの価格履歴
 */
export const calculateIndexHistory = (
  indexDef: IndexDefinition,
  assets: Record<string, Asset>
): IndexHistoryPoint[] => {
  const timeline = getTimeline(assets);
  const constituentAssets = indexDef.constituents.map(symbol => assets[symbol]).filter(Boolean);

  const history: IndexHistoryPoint[] = [];
  let baseIndexValue = 0;


  // タイムライン（日付ごと）にループ
  for (const date of timeline) {
    let currentValue = 0;

    // --- 加重方法に応じて計算を分岐 ---

    if (indexDef.weighting === 'equal') {
      // 均等加重の場合
      let totalRelativeChange = 0;
      for (const asset of constituentAssets) {
        const currentPrice = getPriceOnDate(asset, date);
        const basePrice = asset.prices[0]?.price || 1; // 基準日の価格
        if (basePrice > 0) {
          totalRelativeChange += currentPrice / basePrice;
        }
      }
      currentValue = totalRelativeChange / constituentAssets.length;

    } else if (indexDef.weighting === 'market_cap') {
      // 時価総額加重の場合
      // 基準日の総時価総額を計算
      const baseTotalMarketCap = constituentAssets.reduce((sum, asset) => {
        return sum + (asset.prices[0]?.price || 0) * (asset.marketCap / asset.prices[0]?.price);
      }, 0);
      
      // 現在の総時価総額を計算
      const currentTotalMarketCap = constituentAssets.reduce((sum, asset) => {
        return sum + getPriceOnDate(asset, date) * (asset.marketCap / asset.prices[0]?.price);
      }, 0);
      
      if (baseTotalMarketCap > 0) {
        currentValue = currentTotalMarketCap / baseTotalMarketCap;
      }
    }

    // 最初の計算値を基準値(100)とする
    if (history.length === 0) {
      baseIndexValue = currentValue;
      history.push({ date, value: 100 });
    } else {
      history.push({ date, value: (currentValue / baseIndexValue) * 100 });
    }
  }

  return history;
};