import { expect } from 'chai';
import { processSortingStep } from '../utils/sorting';
import { SortState } from 'state/comparison/types';

describe("processSortingStep", () => {
    const initialUnsortedArr: Array<string> = ["1", "2", "5", "3", "4"];
    const initialSortState: SortState = {
        sortedPart: ["1", "2"],
        curElPos: 2,
        picsToCompare: ["2", "5"],
        start: 0,
        end: 1
      };
    const choice: number = Math.min(Number(initialSortState.picsToCompare[0]), Number(initialSortState.picsToCompare[1]));
    const newSortedState: SortState = processSortingStep(choice, initialUnsortedArr, initialSortState);
    const maxAmongFirstThree: string = String(Math.max(Number(initialUnsortedArr[0]), 
                                                        Number(initialUnsortedArr[1]), 
                                                        Number(initialUnsortedArr[2])));
    it("should return item appended to sorting part", () => {
        expect(newSortedState.sortedPart[2]).equal(maxAmongFirstThree)
    });
    it("should on second iteration compare 2 and 3", () => {
        expect(newSortedState.picsToCompare).deep.equal(["2", "3"])
    });
    it("should correctly insert 3 after 2nd comparison", () => {
        const firstIterChoice: number = Math.min(Number(newSortedState.picsToCompare[0]), 
                                                 Number(newSortedState.picsToCompare[1]));
        const firstIterSortState: SortState = processSortingStep(firstIterChoice, initialUnsortedArr, newSortedState);
        const secondIterChoice: number = Math.min(Number(firstIterSortState.picsToCompare[0]), 
                                                  Number(firstIterSortState.picsToCompare[1]));
        const secondIterSortState: SortState = processSortingStep(secondIterChoice, initialUnsortedArr, firstIterSortState);
        expect(secondIterSortState.sortedPart).deep.equal(["1", "2", "3", "5"]);
        expect(secondIterSortState.curElPos).equal(4);
        expect(secondIterSortState.picsToCompare).deep.equal(["3", "4"]);
        expect(secondIterSortState.start).equal(0);
        expect(secondIterSortState.end).equal(3)
    })
});