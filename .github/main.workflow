workflow "New workflow" {
  on = "push"
  resolves = ["deploy app on push"]
}

action "deploy app on push" {
  uses = "actions/zeit-now@5c51b26db987d15a0133e4c760924896b4f1512f"
  secrets = ["GITHUB_TOKEN"]
  runs = "cd app; npm run deploy"
}
