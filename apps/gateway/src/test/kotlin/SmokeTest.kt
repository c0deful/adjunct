import io.kotest.core.spec.style.FreeSpec
import io.kotest.matchers.shouldBe

class SmokeTest : FreeSpec({
    "this test" {
        1 + 1 shouldBe 2
    }
})