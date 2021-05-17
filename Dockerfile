FROM node:12 AS build

WORKDIR /opt/adme

COPY client ./

RUN npm install && npm install -g @angular/cli cpx

RUN ng build --configuration production --deploy-url=/models/client/ --base-href=/models

FROM continuumio/miniconda:4.7.12

WORKDIR /opt/adme

COPY server ./

COPY --from=build /opt/adme/dist/client client

RUN conda env create -f environment.yml

ENV PATH /opt/conda/envs/ncats-adme/bin:$PATH

RUN chmod +x startup.sh

CMD /bin/bash startup.sh

EXPOSE 5000
