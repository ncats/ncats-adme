from app import app

if __name__ == "__main__":
    from multiprocessing import set_start_method
    set_start_method('forkserver')
    app.run(debug=False)