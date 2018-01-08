import { State, SortState, PicturesMap } from 'state/comparison/types';

export function sort (choice: number, 
                      pics: Array<string>, 
                      sortState: SortState): SortState {
  let {sortedPart, curElPos, start, end, picsToCompare} = sortState;
  const val = pics[curElPos];
  if (start == end) {
    curElPos += 1;
    start = 0;
    end += 1;
    picsToCompare = [sortedPart[Math.trunc(end/2)], pics[curElPos]]
    if (val == String(choice)) {
      sortedPart = sortedPart.slice(0, start).concat([val]).concat(sortedPart.slice(start));
    }
    else {
      sortedPart = sortedPart.concat([val]);
    }
  }
  else {
    if (val == String(choice) && start == 0) {
      curElPos += 1;
      end += 1;
      sortedPart = [val].concat(sortedPart);
      picsToCompare = [sortedPart[0], pics[curElPos]];
    }
    else if (start == 0) {
      start = Math.round(end/2)
      picsToCompare = [sortedPart[start], pics[curElPos]];
    }
    else if (val == String(choice)) {
      start = Math.round(start/2);
      picsToCompare = [sortedPart[start], pics[curElPos]];
    }
    else {
      start = Math.round((start + end)/2);
      picsToCompare = [sortedPart[start], pics[curElPos]];
    }
  }
  const newSortState: SortState = {
    sortedPart,
    curElPos,
    start,
    end,
    picsToCompare
  }
  if (sortedPart.length == pics.length) {
    alert("Done, please stop clicking");
  }
  return newSortState;
}
