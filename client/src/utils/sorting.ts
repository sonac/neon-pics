import { State, SortState, PicturesMap } from 'state/comparison/types';

export function sort (choice: number, 
                      pics: Array<string>, 
                      sortState: SortState): SortState {

  let {sortedPart, curElPos, curSortElPos, picsToCompare} = sortState;
  const val = pics[curElPos];
  const len = sortedPart.length - 1;

  if (curSortElPos == len || curSortElPos == 0) { //criterias for moving to next unsorted element
    if (val != String(choice)) {
      curSortElPos += 1;
    }
    sortedPart = sortedPart.slice(0, curSortElPos).concat([val]).concat(sortedPart.slice(curSortElPos));
    curElPos += 1;
    curSortElPos = Math.trunc((len)/2)
  }
  else { //iterate through sorted part to find a place in the world
    if (val == String(choice)) {
      curSortElPos = Math.trunc(curSortElPos / 2)
    }
    else {
      curSortElPos = Math.trunc((len + curSortElPos) / 2)
    }
  }
  picsToCompare = [sortedPart[curSortElPos], pics[curElPos]];
  const newSortState: SortState = {
    sortedPart,
    curElPos,
    curSortElPos,
    picsToCompare
  }
  console.log(newSortState);
  if (sortedPart.length == pics.length) {
    alert("Done, please stop clicking");
  }
  return newSortState;
}


