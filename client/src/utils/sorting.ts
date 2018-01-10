import { SortState } from 'state/comparison/types';

export function processSortingStep (choice: number, 
                      pics: Array<string>, 
                      sortState: SortState): SortState {

  let {sortedPart, curElPos, picsToCompare, start, end} = sortState;
  const val = pics[curElPos];
  let curSortElPos = Math.round((start + end) / 2);

  if ((end - start) <= 1) { //criterias for moving to next unsorted element
    if (val != String(choice)) {
      curSortElPos += 1;
    }
    sortedPart = sortedPart.slice(0, curSortElPos).concat([val]).concat(sortedPart.slice(curSortElPos));
    curElPos += 1;
    start = 0
    end = sortedPart.length - 1;
  }
  else { //iterate through sorted part to find a place in the world
    if (val == String(choice)) {
      end = Math.round(end / 2)
      curSortElPos = Math.round((start + end) / 2)
    }
    else {
      start = Math.round((start + end) / 2)
      curSortElPos = Math.round((end + start) / 2)
    }
  }
  picsToCompare = [sortedPart[curSortElPos], pics[curElPos]];
  const newSortState: SortState = {
    sortedPart,
    curElPos,
    picsToCompare,
    start,
    end
  }
  if (sortedPart.length == pics.length) {
    alert("Done, please stop clicking");
  }
  return newSortState;
}


