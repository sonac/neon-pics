package sort

import org.scalatest.{FlatSpec, Matchers}

class SortStateTest extends FlatSpec with Matchers{

  val x1 = SortState[Double](Seq(3, 5), List(0), 0, 1)
  val x2 = SortState[Double](Seq(3, 5), List(4), 0, 1)
  val x3 = SortState[Double](Seq(3, 5), List(4), 1, 1)
  val x4 = SortState[Double](Seq(3, 4, 5), List(), 0, 2)
  val xFinished = SortState[Double](Seq(3, 5), List(), 0, 0)

  val r1 = CompareResponse[Double](0, 3, false)
  val r2 = CompareResponse[Double](4, 3, true)
  val r3 = CompareResponse[Double](4, 5, false)

  behavior of "SortStateTest"

  it should "insertAfterPosition" in {
    x1.insertAfterPosition(0.0, -1) shouldEqual
      SortState[Double](Seq(0.0, 3, 5), List(), 0, 2)

    x1.insertAfterPosition(0.0, 0) shouldEqual
      SortState[Double](Seq(3, 0.0, 5), List(), 0, 2)

    x1.insertAfterPosition(0.0, 1) shouldEqual
      SortState[Double](Seq(3, 5, 0.0), List(), 0, 2)
  }

  it should "nextAction" in {
    x1.nextAction shouldEqual CompareRequest(0, 3)
    x2.nextAction shouldEqual CompareRequest(4, 3)
    xFinished.nextAction shouldEqual SortFinished(Seq(3, 5))
  }

  it should "updatedWithResponse" in {
    x1.updatedWithResponse(r1) shouldEqual SortState(Seq(0, 3, 5), List(), 0, 2)
    x2.updatedWithResponse(r2) shouldEqual x3
    x3.updatedWithResponse(r3) shouldEqual x4
  }

  it should "processResponse" in {
    x2.processResponse(r2) shouldEqual (x3, CompareRequest(4, 5))
    x3.processResponse(r3) shouldEqual (x4, SortFinished(Seq(3, 4, 5)))
  }

  it should "sort correctly" in {
    def cmp(x: Out): CompareResponse[Double] = {
      x match {
        case x: CompareRequest[Double] => CompareResponse(x.a, x.b, x.a > x.b)
      }
    }


    val unsorted = Seq[Double](4, 3, 5, 1, 4, 0)
    val sorted = unsorted.sorted

    var (s, o) = new SortState(unsorted).processInit
    while (!o.isInstanceOf[SortFinished[Double]]){
      val (s_, o_) = s.processResponse(cmp(o))
      s = s_
      o = o_
    }

    o shouldEqual SortFinished(sorted)

  }



}
