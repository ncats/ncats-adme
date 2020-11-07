from setuptools import setup, find_namespace_packages

setup(
    name='ncats-adme-predictors',
    version='1',
    author='Jorge Neyra, Vishal Babu Siramshetty, Sankalp Jain',
    author_email='jorge.neyra@nih.gov, vishalbabu.siramshetty@nih.gov, sankalp.jain@nih.gov',
    packages=find_namespace_packages(include=[
        'rlm.*',
        'cypp450.*'
        'features.*'
        'utilities.*'
    ]),
    zip_safe=False
)