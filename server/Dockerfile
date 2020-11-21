FROM continuumio/miniconda:4.7.12

WORKDIR /opt/adme

COPY ./ ./

RUN conda env create -f environment.yml
ENV PATH /opt/conda/envs/ncats-adme/bin:$PATH
RUN chmod +x startup.sh

# Make RUN commands use the new environment:
#SHELL ["conda", "run", "-n", "ncats-adme", "/bin/bash", "-c"]

# Make sure the environment is activated:
#RUN echo "Make sure flask is installed:"
#RUN python -c "import flask"

CMD /bin/bash startup.sh

EXPOSE 5000
