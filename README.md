pomodoro.cc
============

# Boost your productivity
## Manage your time more effectively

[Pomodoro.cc](http://pomodoro.cc) is an online time tracking tool to plan and review the tasks for the day.

It takes advantage of the guidelines described in the [Pomodoro Technique](http://pomodorotechnique.com) to work more effectively with frequent, mind-refreshing breaks.

With the help of insightful statistics, you'll be able to better understand how much time you spent on each task and how focused you were.



# Todo

see open [issues](https://github.com/christian-fei/pomodoro.cc/issues)



# Contributing

View the readme of the service you would like to contribute to :)

Also check out [CONTRIBUTING.md](CONTRIBUTING.md)



# Development environment setup (vagrant, docker)

To setup a development machine you'll need:

- **vagrant** 1.7.4
- **virtualbox** 5.0.6
- **nodejs** 4.2.1, **npm** 3

*Note*: setup works with these versions, previous version might also work.


### bootstrap

Run the following to bootstrap the environment (install the needed dependencies, setup docker, build the images).
Grab a coffee in the meantime, this takes about 2-5 minutes

```
opt/bootstrap
```

Add an entry in your `/etc/hosts`:

```
192.168.11.2    pomodoro.dev
```


### authentication (optional)

If you want authentication on `http://pomodoro.dev` to work, you'll need to provide the necessary tokens (from the github and twitter developer panel) in the `credentials.json`.

### boot development environment

Boot up the vagrant, grab another coffee:

```
vagrant up
```


# Helpful information during local development

Run these script from inside vagrant. (Located under `/pomodoro.cc`)

### To rebuild the infrastructure

`opt/docker.restart DEV`

or

- `opt/docker.build`
- `opt/docker.rm`
- `opt/docker.run`


The `DEV` flag is used in the container that holds the web application's front-end,
so that you can see the changes reflected in a couple of seconds, without relaunching the script.

Also it opens a fake authentication route `/auth/fake` used for E2E testing.

### List running containers

with `docker ps`


### Logs

run `docker ps` to get a list of the running processes and `docker logs -f [container id]` for a live output.





# Development metrics

[![Waffle.io - Columns and their card count](https://badge.waffle.io/christian-fei/pomodoro.cc.svg?columns=all)](http://waffle.io/christian-fei/pomodoro.cc)

[![Throughput Graph](https://graphs.waffle.io/christian-fei/pomodoro.cc/throughput.svg)](https://waffle.io/christian-fei/pomodoro.cc/metrics)

