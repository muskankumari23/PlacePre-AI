import statistics from "../../constants/statistics";

function Statistics() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-10 grid grid-cols-4 gap-8">

        {statistics.map((item) => (
          <div
            key={item.id}
            className="bg-slate-50 rounded-xl shadow-sm p-8 text-center"
          >
            <h2 className="text-4xl font-bold text-blue-600">
              {item.value}
            </h2>

            <p className="mt-3 text-gray-600">
              {item.title}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}

export default Statistics;