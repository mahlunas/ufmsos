FROM container-registry.oracle.com/graalvm/native-image:23 AS build
WORKDIR /app
COPY . .
RUN ./mvnw --no-transfer-progress native:compile -Pnative

FROM alpine:latest
WORKDIR /app
COPY --from=build /app/target/curriculo-service curriculo-service
EXPOSE 8086
ENTRYPOINT ["./curriculo-service"]
