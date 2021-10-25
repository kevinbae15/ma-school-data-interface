PWD=$(shell pwd)

# Use for deploying to staging environment
# STAGING_NAME=ten-boilerplate-frontend-stagin
PROD_NAME=ten-boilerplate-frontend
PORT=3000
VERSION=$(shell git describe --tags --always --dirty)
IMAGE=$(PROD_NAME):$(VERSION)
LAST_TAG=.last_tag

echotag:
	@echo "$(IMAGE)" > $(LAST_TAG)

build: echotag
	npm run build
	docker build -t $(IMAGE) .

buildprod: echotag
	npm run buildprod
	docker build -t $(IMAGE) .

buildstaging: echotag
	npm run buildstaging
	docker build -t $(IMAGE) .

clean:
	docker ps -af status=exited | grep $(PROD_NAME) | awk '{print $$1}' | xargs -I xxx docker rm xxx
	docker images -qf dangling=true | grep $(PROD_NAME) | awk '{print $$3}' | xargs -I xxx docker rmi xxx

dockerrun:
	docker run -d -p $(PORT):$(PORT) --name $(PROD_NAME) $(IMAGE)

prune:
	docker image prune -a -f --filter 'label=service=$(PROD_NAME)'

run: prune build stop dockerrun

runprod: prune buildprod stop dockerrun

pushstaging: checkbranch checkdirty
	docker tag $(IMAGE) 'registry.heroku.com/$(STAGING_NAME)/web'
	docker push 'registry.heroku.com/$(STAGING_NAME)/web'

pushprod: checkbranch checkdirty
	docker tag $(IMAGE) 'registry.heroku.com/$(PROD_NAME)/web'
	docker push 'registry.heroku.com/$(PROD_NAME)/web'

releaseprod:
	heroku container:release web --app $(PROD_NAME)

releasestaging:
	heroku container:release web --app $(STAGING_NAME)


########## Deploy Commands ############

# deploy-prod:  prune buildprod pushprod releaseprod

# deploy-staging:  prune buildstaging pushstaging releasestaging


stop:
	@docker kill $(PROD_NAME) ||:
	@docker rm $(PROD_NAME) ||:

tail:
	-docker logs --follow $(PROD_NAME)

checkbranch:
	@echo "Checking for master branch"
ifneq ($(shell git rev-parse --abbrev-ref HEAD),master)
	$(error "Not on the master branch. Make sure to switch to master branch")
endif
	@echo "Currently on master branch"

checkdirty:
	stat $(LAST_TAG)
	@echo "Checking to make sure we do not push dirty tag"
	git describe --tags --always --dirty | grep -vq dirty || $(MAKE) dirtyfail

checkbuild:
ifneq ($(shell cat $(LAST_TAG) | sed 's/.*:\(.*\)/\1/'),$(shell git describe --tags --always --dirty))
	$(error "The .last_tag value and the value for your working copy aren't synced. Make sure you build and run before pushing")
endif

dirtyfail:
	$(error "Commit and push changes upstream with git before pushing your images. Dirty pushes are not advised")