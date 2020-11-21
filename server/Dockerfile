FROM continuumio/miniconda:4.7.12

WORKDIR /opt/adme

COPY ./ ./

RUN conda env create -f environment.yml

ENV PATH /opt/conda/envs/ncats-adme/bin:$PATH

RUN chmod +x startup.sh

CMD /bin/bash startup.sh

EXPOSE 5000
