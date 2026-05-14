package c0deful.adjunct.gateway

import io.kotest.core.spec.style.FunSpec
import io.kotest.matchers.shouldBe
import io.ktor.client.call.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.testing.*
import kotlinx.serialization.Serializable

class GatewayAppSpec : FunSpec({
    test("'/' returns 'Hello World!' text") {
        testApplication {
            application {
                module()
            }
            val client = createClient {}
            val response = client.get("/")

            response.status shouldBe HttpStatusCode.OK
            response.contentType()!!.match(ContentType.Text.Plain) shouldBe true
            response.bodyAsText() shouldBe "Hello World!"
        }
    }

    test("'/json' returns json object") {
        @Serializable
        data class HelloWorldObject(val hello: String)
        testApplication {
            application {
                module()
            }
            val client = createClient {
                install(ContentNegotiation) {
                    json()
                }
            }
            val response = client.get("/json")

            response.status shouldBe HttpStatusCode.OK
            response.contentType()!!.match(ContentType.Application.Json) shouldBe true
            response.body<HelloWorldObject>() shouldBe HelloWorldObject("world")
        }
    }
})