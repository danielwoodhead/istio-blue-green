# Blue-green deployments

Blue-green deployments with:

- istio
- helm

## Instructions

Build version 1 of the image

```
docker build -t istio-demo:1.0.0 .
```

Deploy version 1

```
helm upgrade --install istio-demo ./deployment/helm/istio-demo
```

Build version 2 of the image

```
docker build -t istio-demo:2.0.0 .
```

Get the current live colour

```
kubectl get deployments --selector=stage=live -o jsonpath='{.items[*].metadata.labels.colour}'
```

```
blue
```

Deploy version 2 to the staging colour

```
helm upgrade --install --reuse-values --set green.tag=2.0.0 istio-demo ./deployment/helm/istio-demo
```

Make a call against the live version

```
curl http://localhost/demo
```

```
This is v1.0.0
```

Make a call against the staging version

```
curl http://localhost/demo?staging=true
```

```
This is v2.0.0
```

Swap the colours

```
helm upgrade --install --reuse-values --set live=green istio-demo ./deployment/helm/istio-demo
```

Make a call against the live version

```
curl http://localhost/demo
```

```
This is v2.0.0
```

Make a call against the staging version

```
curl http://localhost/demo?staging=true
```

```
This is v1.0.0
```
