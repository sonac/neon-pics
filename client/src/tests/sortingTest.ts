import { expect } from 'chai';
import { processSortingStep } from '../utils/sorting';
import { SortState } from 'state/comparison/types';

describe("processSortingStep", () => {
    const initialUnsortedArr: Array<string> = ["1", "2", "5", "3", "4"]
    const initialSortState: SortState = {
        sortedPart: ["1", "2"],
        curElPos: 2,
        picsToCompare: ["2", "5"],
        start: 0,
        end: 1
      }
    it("should return item appended to sorting part", () => {
        const choice: number = Math.min(Number(initialSortState.picsToCompare[0]), Number(initialSortState.picsToCompare[1]))
        const newSortedPart: SortState = processSortingStep(choice, initialUnsortedArr, initialSortState)
        expect(newSortedPart.sortedPart.length).equal(3)
    });
});