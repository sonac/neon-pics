package sort

case class Picture(id: Int)

sealed trait Out

case class CompareRequest[T](a: T, b: T) extends Out

case class SortFinished[T](pictures: Seq[T]) extends Out


sealed trait In

case object Init extends In

case class CompareResponse[T](a: T, b: T, gt: Boolean) extends In


case class SortState[T](sorted: Seq[T], unsorted: List[T], lowerBoundPosition: Int, upperBoundPosition: Int) {
  def this(pictures: Seq[T]) {
    this(pictures.headOption.toSeq, pictures.tail.toList, 0, 0)
  }

  def receive(in: In): (SortState[T], Out) = {
    in match {
      case Init => processInit
      case x: CompareResponse[T] => processResponse(x)
    }
  }

  def processInit: (SortState[T], Out) = {
    (this, nextAction)
  }

  def processResponse(compareResponse: CompareResponse[T]): (SortState[T], Out) = {
    val sortState = updatedWithResponse(compareResponse)
    (sortState, sortState.nextAction)
  }

  def updatedWithResponse(compareResponse: CompareResponse[T]): SortState[T] = {
    require(compareResponse.a == unsorted.head)
    require(compareResponse.b == sorted(midPosition))

    if (compareResponse.gt) {
      if (midPosition == upperBoundPosition) {
        insertAfterPosition(compareResponse.a, upperBoundPosition)
      } else {
        copy(lowerBoundPosition = midPosition + 1)
      }
    } else {
      if (midPosition == lowerBoundPosition) {
        insertAfterPosition(compareResponse.a, lowerBoundPosition - 1)
      } else {
        copy(upperBoundPosition = midPosition)
      }
    }
  }

  def insertAfterPosition(picture: T, position: Int): SortState[T] = {
    require(position >= -1)
    require(position <= sorted.length)

    val sortedUpdated = if (position > -1) {
      val h: Seq[T] = sorted.slice(0, position + 1)
      val t: Seq[T] = sorted.slice(position + 1, sorted.length)
      (h :+ picture) ++ t
    } else {
      picture +: sorted
    }

    copy(sortedUpdated, unsorted.tail, 0, sortedUpdated.length - 1)
  }

  def nextAction: Out = {
    if (unsorted.nonEmpty) {
      CompareRequest(unsorted.head, sorted(midPosition))
    } else {
      SortFinished(sorted)
    }
  }

  private def midPosition: Int = (lowerBoundPosition + upperBoundPosition) / 2
}