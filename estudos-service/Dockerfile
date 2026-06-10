FROM container-registry.oracle.com/graalvm/native-image:23 AS build
WORKDIR /app
COPY . .
RUN ./mvnw --no-transfer-progress native:compile -Pnative

FROM alpine:latest
WORKDIR /app
COPY --from=build /app/target/estudos-service estudos-service
EXPOSE 8081
ENTRYPOINT ["./estudos-service"]
